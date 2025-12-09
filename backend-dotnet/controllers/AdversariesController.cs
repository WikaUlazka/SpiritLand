using Microsoft.AspNetCore.Authorization;
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
        public async Task<IActionResult> GetAll()
        {
            var adversaries = await _context.Adversaries.ToListAsync();
            return Ok(adversaries);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var adv = await _context.Adversaries.FirstOrDefaultAsync(a => a.Id == id);

            if (adv == null)
                return NotFound();

            return Ok(adv);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(CreateAdversaryDto dto)
        {
            var adv = new Adversary
            {
                Name = dto.Name,
                ImageUrl = dto.ImageUrl
            };

            _context.Adversaries.Add(adv);
            await _context.SaveChangesAsync();

            return Ok(adv);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, CreateAdversaryDto dto)
        {
            var adv = await _context.Adversaries.FindAsync(id);
            if (adv == null)
                return NotFound();

            adv.Name = dto.Name;
            adv.ImageUrl = dto.ImageUrl;

            await _context.SaveChangesAsync();

            return Ok(adv);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var adversary = await _context.Adversaries
                .FirstOrDefaultAsync(a => a.Id == id);

            if (adversary == null)
                return NotFound();

            _context.Adversaries.Remove(adversary);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Deleted" });
        }
    }
}
