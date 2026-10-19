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
        public async Task<IActionResult> SendInvite([FromBody] SendInviteDto dto)
        {
            if (dto == null)
                return BadRequest("Brak danych zaproszenia.");

            if (dto.SenderUserId <= 0)
                return BadRequest("Nieprawidłowy nadawca.");

            if (dto.ReceiverUserId <= 0)
                return BadRequest("Nieprawidłowy odbiorca.");

            if (dto.GameId <= 0)
                return BadRequest("Nieprawidłowa gra.");

            var senderExists = await _context.Users
                .AnyAsync(u => u.Id == dto.SenderUserId);

            if (!senderExists)
                return BadRequest("Nadawca nie istnieje.");

            var receiverExists = await _context.Users
                .AnyAsync(u => u.Id == dto.ReceiverUserId);

            if (!receiverExists)
                return BadRequest("Odbiorca nie istnieje.");

            var gameExists = await _context.Games
                .AnyAsync(g => g.Id == dto.GameId);

            if (!gameExists)
                return BadRequest("Gra nie istnieje.");

            var existingInvite = await _context.GameInvites
                .AnyAsync(i =>
                    i.GameId == dto.GameId &&
                    i.ReceiverUserId == dto.ReceiverUserId &&
                    i.Status == "Pending");

            if (existingInvite)
                return BadRequest("Ten użytkownik ma już zaproszenie do tej gry.");

            var invite = new GameInvite
            {
                SenderUserId = dto.SenderUserId,
                ReceiverUserId = dto.ReceiverUserId,
                GameId = dto.GameId,
                Status = "Pending",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

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

            if (invite.GameId == null)
                return BadRequest("Zaproszenie nie jest przypisane do gry.");

            invite.Status = "Accepted";
            invite.UpdatedAt = DateTime.UtcNow;

            var alreadyPlayer = await _context.GamePlayers
                .AnyAsync(p =>
                    p.GameId == invite.GameId &&
                    p.UserId == invite.ReceiverUserId);

            if (!alreadyPlayer)
            {
                var player = new GamePlayer
                {
                    GameId = invite.GameId.Value,
                    UserId = invite.ReceiverUserId
                };

                _context.GamePlayers.Add(player);
            }

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

    public class SendInviteDto
    {
        public int SenderUserId { get; set; }

        public int ReceiverUserId { get; set; }

        public int GameId { get; set; }
    }
}
