using Microsoft.AspNetCore.Authorization;
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
        public async Task<IActionResult> GetAll()
        {
            var spirits = await _context.Spirits
                .Select(s => new {
                    s.Id,
                    s.Name,
                    s.ImageUrl
                })
                .ToListAsync();

            return Ok(spirits);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var spirit = await _context.Spirits
                .Include(s => s.Aspects)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (spirit == null)
                return NotFound();

            return Ok(spirit);
        }


        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(CreateSpiritDto dto)
        {
            var spirit = new Spirit
            {
                Name = dto.Name,
                Description = dto.Description,
                Complexity = dto.Complexity,
                ImageUrl = dto.ImageUrl
            };

            _context.Spirits.Add(spirit);
            await _context.SaveChangesAsync();

            return Ok(spirit);
        }

        [Authorize]
        [HttpPost("{spiritId}/aspects")]
        public async Task<IActionResult> AddAspect(int spiritId, CreateAspectDto dto)
        {
            var spirit = await _context.Spirits.FindAsync(spiritId);
            if (spirit == null)
                return NotFound(new { message = "Spirit not found" });

            var aspect = new Aspect
            {
                SpiritId = spiritId,
                Name = dto.Name,
                ImageUrl = dto.ImageUrl
            };

            _context.Aspects.Add(aspect);
            await _context.SaveChangesAsync();

            return Ok(aspect);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, CreateSpiritDto dto)
        {
            var spirit = await _context.Spirits.FindAsync(id);
            if (spirit == null)
                return NotFound();

            spirit.Name = dto.Name;
            spirit.Description = dto.Description;
            spirit.Complexity = dto.Complexity;
            spirit.ImageUrl = dto.ImageUrl;

            await _context.SaveChangesAsync();
            return Ok(spirit);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var spirit = await _context.Spirits
                .Include(s => s.Aspects)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (spirit == null)
                return NotFound();

            _context.Aspects.RemoveRange(spirit.Aspects);
            _context.Spirits.Remove(spirit);

            await _context.SaveChangesAsync();

            return Ok(new { message = "Deleted" });
        }
    }
}
