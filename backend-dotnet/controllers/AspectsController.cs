using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpiritlandBackend.Data;
using SpiritlandBackend.Models;

namespace SpiritlandBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AspectsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AspectsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("by-spirit/{spiritId}")]
        public async Task<ActionResult<IEnumerable<Aspect>>> GetAspectsForSpirit(int spiritId)
        {
            var aspects = await _context.Aspects
                .Where(a => a.SpiritId == spiritId)
                .ToListAsync();

            return Ok(aspects);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Aspect>>> GetAll()
        {
            return Ok(await _context.Aspects.ToListAsync());
        }
    }
}
