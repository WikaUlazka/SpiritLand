using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpiritlandBackend.Data;
using SpiritlandBackend.Models;

namespace SpiritlandBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ScenariosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ScenariosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _context.Scenarios.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var scenario = await _context.Scenarios.FindAsync(id);
            if (scenario == null) return NotFound();

            return Ok(scenario);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Scenario scenario)
        {
            _context.Scenarios.Add(scenario);
            await _context.SaveChangesAsync();
            return Ok(scenario);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Scenario update)
        {
            var scenario = await _context.Scenarios.FindAsync(id);
            if (scenario == null) return NotFound();

            scenario.Name = update.Name;
            scenario.Description = update.Description;

            await _context.SaveChangesAsync();
            return Ok(scenario);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var scenario = await _context.Scenarios.FindAsync(id);
            if (scenario == null) return NotFound();

            _context.Scenarios.Remove(scenario);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Deleted" });
        }
    }
}
