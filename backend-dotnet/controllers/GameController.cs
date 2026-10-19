
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpiritlandBackend.Data;
using SpiritlandBackend.Models;
using System.Security.Claims;

namespace SpiritlandBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GamesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GamesController(AppDbContext context)
        {
            _context = context;
        }

        // Gry utworzone przez użytkownika oraz gry,
        // w których użytkownik jest uczestnikiem.
        [Authorize]
        [HttpGet("user")]
        public async Task<IActionResult> GetUserGames()
        {
            var userIdString = User.FindFirstValue(
                ClaimTypes.NameIdentifier
            );

            if (!int.TryParse(userIdString, out var userId))
                return Unauthorized();

            var games = await _context.Games
                .Where(g =>
                    g.CreatorUserId == userId ||
                    g.Players.Any(p => p.UserId == userId)
                )
                .OrderByDescending(g => g.DatePlayed)
                .Select(g => new
                {
                    g.Id,
                    g.DatePlayed,
                    g.Result,
                    g.Difficulty,
                    AdversaryName = g.Adversary != null
                        ? g.Adversary.Name
                        : null,
                    ScenarioName = g.Scenario != null
                        ? g.Scenario.Name
                        : null
                })
                .ToListAsync();

            return Ok(games);
        }

        // Statystyki duchów użytkownika.
        [Authorize]
        [HttpGet("stats")]
        public async Task<IActionResult> GetUserStats()
        {
            var userIdString = User.FindFirstValue(
                ClaimTypes.NameIdentifier
            );

            if (!int.TryParse(userIdString, out var userId))
                return Unauthorized();

            var games = await _context.GamePlayers
                .Where(gp =>
                    gp.UserId == userId &&
                    gp.SpiritId != null
                )
                .Select(gp => new
                {
                    SpiritId = gp.SpiritId,
                    SpiritName = gp.Spirit!.Name,
                    Result = gp.Game.Result
                })
                .ToListAsync();

            var stats = games
                .GroupBy(x => new
                {
                    x.SpiritId,
                    x.SpiritName
                })
                .Select(group => new
                {
                    SpiritId = group.Key.SpiritId,
                    SpiritName = group.Key.SpiritName,
                    Played = group.Count(),
                    Wins = group.Count(x =>
                        x.Result.ToLower() == "win"
                    ),
                    Losses = group.Count(x =>
                        x.Result.ToLower() == "loss"
                    )
                })
                .OrderByDescending(x => x.Played)
                .ToList();

            return Ok(stats);
        }

        // Szczegóły gry.
        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGame(int id)
        {
            var game = await _context.Games
                .Include(g => g.Players)
                    .ThenInclude(p => p.User)
                .Include(g => g.Players)
                    .ThenInclude(p => p.Spirit)
                .Include(g => g.Players)
                    .ThenInclude(p => p.Aspect)
                .Include(g => g.Adversary)
                .Include(g => g.Scenario)
                .FirstOrDefaultAsync(g => g.Id == id);

            if (game == null)
                return NotFound();

            var userIdString = User.FindFirstValue(
                ClaimTypes.NameIdentifier
            );

            if (!int.TryParse(userIdString, out var userId))
                return Unauthorized();

            // Dostęp ma twórca albo uczestnik gry.
            if (game.CreatorUserId != userId &&
                !game.Players.Any(p => p.UserId == userId))
            {
                return Forbid();
            }

            return Ok(game);
        }

        // Tworzenie gry.
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateGame(
            [FromBody] CreateGameDto dto)
        {
            if (dto == null)
                return BadRequest("Brak danych gry.");

            var userIdString = User.FindFirstValue(
                ClaimTypes.NameIdentifier
            );

            if (!int.TryParse(userIdString, out var userId))
                return Unauthorized();

            var game = new Game
            {
                CreatorUserId = userId,
                DatePlayed = dto.DatePlayed,
                AdversaryId = dto.AdversaryId,
                ScenarioId = dto.ScenarioId,
                Difficulty = dto.Difficulty,
                BoardSetup = dto.BoardSetup,
                Result = dto.Result,
                EndReason = dto.EndReason,
                Turns = dto.Turns,
                Comment = dto.Comment,
                BlightedIsland = dto.BlightedIsland,
                Players = dto.Players
                    .GroupBy(p => p.UserId)
                    .Select(group => group.First())
                    .Select(p => new GamePlayer
                    {
                        UserId = p.UserId,
                        SpiritId = p.SpiritId,
                        AspectId = p.AspectId,
                        Notes = p.Notes
                    })
                    .ToList()
            };

            // Twórca gry powinien również być jej uczestnikiem.
            if (!game.Players.Any(p => p.UserId == userId))
            {
                game.Players.Add(new GamePlayer
                {
                    UserId = userId,
                    SpiritId = null,
                    AspectId = null,
                    Notes = null
                });
            }

            _context.Games.Add(game);

            await _context.SaveChangesAsync();

            return Ok(game);
        }

        // Aktualizacja gry.
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGame(
            int id,
            [FromBody] UpdateGameDto dto)
        {
            if (dto == null)
                return BadRequest("Brak danych gry.");

            var userIdString = User.FindFirstValue(
                ClaimTypes.NameIdentifier
            );

            if (!int.TryParse(userIdString, out var userId))
                return Unauthorized();

            var game = await _context.Games
                .Include(g => g.Players)
                .FirstOrDefaultAsync(g => g.Id == id);

            if (game == null)
                return NotFound();

           bool isCreator = game.CreatorUserId == userId;

            bool isPlayer = game.Players.Any(p => p.UserId == userId);

            if (!isCreator && !isPlayer)
                return Forbid();

            game.DatePlayed = dto.DatePlayed;
            game.AdversaryId = dto.AdversaryId;
            game.ScenarioId = dto.ScenarioId;
            game.Difficulty = dto.Difficulty;
            game.BoardSetup = dto.BoardSetup;
            game.Result = dto.Result;
            game.EndReason = dto.EndReason;
            game.Turns = dto.Turns;
            game.Comment = dto.Comment;
            game.BlightedIsland = dto.BlightedIsland;

            var incomingPlayers = dto.Players;

            var uniquePlayers = incomingPlayers
                .GroupBy(p => p.UserId)
                .Select(group => group.First())
                .ToList();

            var incomingUserIds = uniquePlayers
                .Select(p => p.UserId)
                .ToHashSet();

            var playersToRemove = game.Players
                .Where(p => !incomingUserIds.Contains(p.UserId))
                .ToList();

            _context.GamePlayers.RemoveRange(playersToRemove);

            foreach (var playerDto in uniquePlayers)
            {
                var existingPlayer = game.Players.FirstOrDefault(
                    p => p.UserId == playerDto.UserId
                );

                if (existingPlayer != null)
                {
                    existingPlayer.SpiritId = playerDto.SpiritId;
                    existingPlayer.AspectId = playerDto.AspectId;
                    existingPlayer.Notes = playerDto.Notes;
                }
                else
                {
                    game.Players.Add(new GamePlayer
                    {
                        UserId = playerDto.UserId,
                        SpiritId = playerDto.SpiritId,
                        AspectId = playerDto.AspectId,
                        Notes = playerDto.Notes
                    });
                }
            }

            if (!game.Players.Any(p => p.UserId == game.CreatorUserId))
            {
                game.Players.Add(new GamePlayer
                {
                    UserId = game.CreatorUserId,
                    SpiritId = null,
                    AspectId = null,
                    Notes = null
                });
            }

            await _context.SaveChangesAsync();

            return Ok(game);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGame(int id)
        {
            var userIdString = User.FindFirstValue(
                ClaimTypes.NameIdentifier
            );

            if (!int.TryParse(userIdString, out var userId))
                return Unauthorized();

            var game = await _context.Games
                .Include(g => g.Players)
                .FirstOrDefaultAsync(g => g.Id == id);

            if (game == null)
                return NotFound();

            if (game.CreatorUserId != userId)
                return Forbid();

            _context.GamePlayers.RemoveRange(game.Players);
            _context.Games.Remove(game);

            await _context.SaveChangesAsync();

            return Ok(new { message = "Game deleted" });
        }
    }
}