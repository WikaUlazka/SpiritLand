using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpiritlandBackend.Data;
using SpiritlandBackend.Models;

namespace SpiritlandBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SpiritsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SpiritsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Spirit>>> GetSpirits()
        {
            return await _context.Spirits.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Spirit>> GetSpirit(int id)
        {
            var spirit = await _context.Spirits.FindAsync(id);
            if (spirit == null) return NotFound();
            return spirit;
        }

        [HttpPost]
        public async Task<ActionResult<Spirit>> CreateSpirit(Spirit spirit)
        {
            _context.Spirits.Add(spirit);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetSpirit), new { id = spirit.Id }, spirit);
        }
    }
}
