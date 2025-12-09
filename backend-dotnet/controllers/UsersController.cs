using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpiritlandBackend.Data;
using SpiritlandBackend.Models;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace SpiritlandBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        private int? GetUserId()
        {
            var id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return id != null ? int.Parse(id) : null;
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetMe()
        {
            var userId = GetUserId();
            if (userId == null) return Unauthorized();

            var user = await _context.Users
                .Where(u => u.Id == userId)
                .Select(u => new
                {
                    u.Id,
                    u.Username,
                    u.Email,
                    u.CreatedAt,
                    u.FavoriteSpiritId,
                    u.FavoriteAspectId
                })
                .FirstOrDefaultAsync();

            return Ok(user);
        }

        [Authorize]
        [HttpPut("me")]
        public async Task<IActionResult> UpdateProfile(UpdateProfileDto dto)
        {
            var userId = GetUserId();
            if (userId == null) return Unauthorized();

            var user = await _context.Users.FindAsync(userId);
            if (user == null) return NotFound();

            if (user.Username != dto.Username &&
                await _context.Users.AnyAsync(u => u.Username == dto.Username))
                return BadRequest(new { message = "Username already taken" });

            user.Username = dto.Username;
            user.FavoriteSpiritId = dto.FavoriteSpiritId;
            user.FavoriteAspectId = dto.FavoriteAspectId;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Profile updated" });
        }

        [Authorize]
        [HttpPut("me/password")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDto dto)
        {
            var userId = GetUserId();
            if (userId == null) return Unauthorized();

            var user = await _context.Users.FindAsync(userId);
            if (user == null) return NotFound();

            // Verify old password
            if (Hash(dto.OldPassword) != user.PasswordHash)
                return BadRequest(new { message = "Old password incorrect" });

            user.PasswordHash = Hash(dto.NewPassword);

            await _context.SaveChangesAsync();
            return Ok(new { message = "Password updated" });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _context.Users
                .Where(u => u.Id == id)
                .Select(u => new
                {
                    u.Id,
                    u.Username,
                    u.FavoriteSpiritId,
                    u.FavoriteAspectId,
                    u.CreatedAt
                })
                .FirstOrDefaultAsync();

            if (user == null) return NotFound();
            return Ok(user);
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery] string? search)
        {
            var query = _context.Users.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(u =>
                    u.Username.ToLower().Contains(search.ToLower()));
            }

            var users = await query
                .OrderBy(u => u.Username)
                .Select(u => new
                {
                    u.Id,
                    u.Username,
                    u.CreatedAt
                })
                .ToListAsync();

            return Ok(users);
        }

        private string Hash(string password)
        {
            return Convert.ToHexString(
                SHA256.HashData(Encoding.UTF8.GetBytes(password))
            );
        }
    }
}
