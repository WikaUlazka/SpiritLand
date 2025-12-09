using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpiritlandBackend.Data;
using SpiritlandBackend.Models;

namespace SpiritlandBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GamePlayersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GamePlayersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("game/{gameId}")]
        public async Task<IActionResult> GetPlayersForGame(int gameId)
        {
            var players = await _context.GamePlayers
                .Where(p => p.GameId == gameId)
                .Include(p => p.Spirit)
                .Include(p => p.Aspect)
                .Include(p => p.User)
                .ToListAsync();

            return Ok(players);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePlayer(int id, [FromBody] GamePlayer updated)
        {
            var player = await _context.GamePlayers.FindAsync(id);

            if (player == null)
                return NotFound();

            player.SpiritId = updated.SpiritId;
            player.AspectId = updated.AspectId;
            player.Notes = updated.Notes;

            await _context.SaveChangesAsync();

            return Ok(player);
        }
    }
}
