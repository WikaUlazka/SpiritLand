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

        [Authorize]
        [HttpGet("user")]
        public async Task<IActionResult> GetUserGames()
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userIdString == null)
                return Unauthorized();

            int userId = int.Parse(userIdString);

            var games = await _context.Games
                .Where(g => g.CreatorUserId == userId)
                .OrderByDescending(g => g.DatePlayed)
                .Select(g => new
                {
                    g.Id,
                    g.DatePlayed,
                    g.Result
                })
                .ToListAsync();

            return Ok(games);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGame(int id)
        {
            var game = await _context.Games
                .Include(g => g.Players)
                .FirstOrDefaultAsync(g => g.Id == id);

            if (game == null)
                return NotFound();

            return Ok(game);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateGame([FromBody] CreateGameDto dto)
        {
            var game = new Game
            {
                CreatorUserId = dto.CreatorUserId,
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
                Players = dto.Players.Select(p => new GamePlayer
                {
                    UserId = p.UserId,
                    SpiritId = p.SpiritId,
                    AspectId = p.AspectId,
                    Notes = p.Notes
                }).ToList()
            };

            _context.Games.Add(game);
            await _context.SaveChangesAsync();

            return Ok(game);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGame(int id, [FromBody] UpdateGameDto dto)
        {
            var game = await _context.Games
                .Include(g => g.Players)
                .FirstOrDefaultAsync(g => g.Id == id);

            if (game == null)
                return NotFound();

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

            game.Players = dto.Players.Select(p => new GamePlayer
            {
                UserId = p.UserId,
                SpiritId = p.SpiritId,
                AspectId = p.AspectId,
                Notes = p.Notes
            }).ToList();

            await _context.SaveChangesAsync();
            return Ok(game);
        }
        [Authorize]
[HttpDelete("{id}")]
public async Task<IActionResult> DeleteGame(int id)
{
    var game = await _context.Games
        .Include(g => g.Players)
        .FirstOrDefaultAsync(g => g.Id == id);

    if (game == null)
        return NotFound();

    _context.GamePlayers.RemoveRange(game.Players);
    _context.Games.Remove(game);

    await _context.SaveChangesAsync();

    return Ok(new { message = "Game deleted" });
}

    }
    
}
