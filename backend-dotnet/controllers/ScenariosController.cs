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
        public async Task<ActionResult<IEnumerable<Scenario>>> GetScenarios()
        {
            return await _context.Scenarios.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Scenario>> GetScenario(int id)
        {
            var scenario = await _context.Scenarios.FindAsync(id);
            if (scenario == null) return NotFound();
            return scenario;
        }

        [HttpPost]
        public async Task<ActionResult<Scenario>> CreateScenario(Scenario scenario)
        {
            _context.Scenarios.Add(scenario);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetScenario), new { id = scenario.Id }, scenario);
        }
    }
}
