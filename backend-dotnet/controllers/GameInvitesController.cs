using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpiritlandBackend.Data;
using SpiritlandBackend.Models;

namespace SpiritlandBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GameInvitesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GameInvitesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserInvites(int userId)
        {
            var invites = await _context.GameInvites
                .Where(i => i.ReceiverUserId == userId)
                .Include(i => i.Game)
                .ToListAsync();

            return Ok(invites);
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendInvite([FromBody] GameInvite invite)
        {
            if (invite == null)
                return BadRequest();

            invite.Status = "Pending";
            invite.CreatedAt = DateTime.UtcNow;
            invite.UpdatedAt = DateTime.UtcNow;

            _context.GameInvites.Add(invite);
            await _context.SaveChangesAsync();

            return Ok(invite);
        }

        [HttpPost("accept/{inviteId}")]
        public async Task<IActionResult> AcceptInvite(int inviteId)
        {
            var invite = await _context.GameInvites.FindAsync(inviteId);

            if (invite == null)
                return NotFound();

            invite.Status = "Accepted";
            invite.UpdatedAt = DateTime.UtcNow;

            var player = new GamePlayer
            {
                GameId = invite.GameId.Value,
                UserId = invite.ReceiverUserId,
                SpiritId = null,
                AspectId = null,
                Notes = null
            };

            _context.GamePlayers.Add(player);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Invite accepted" });
        }

        [HttpPost("reject/{inviteId}")]
        public async Task<IActionResult> RejectInvite(int inviteId)
        {
            var invite = await _context.GameInvites.FindAsync(inviteId);

            if (invite == null)
                return NotFound();

            invite.Status = "Rejected";
            invite.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Invite rejected" });
        }
    }
}
