using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpiritlandBackend.Data;
using SpiritlandBackend.Models;

namespace SpiritlandBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdversariesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdversariesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Adversary>>> GetAdversaries()
        {
            return await _context.Adversaries.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Adversary>> GetAdversary(int id)
        {
            var adversary = await _context.Adversaries.FindAsync(id);
            if (adversary == null) return NotFound();
            return adversary;
        }

        [HttpPost]
        public async Task<ActionResult<Adversary>> CreateAdversary(Adversary adversary)
        {
            _context.Adversaries.Add(adversary);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAdversary), new { id = adversary.Id }, adversary);
        }
    }
}
