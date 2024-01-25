using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DigitalLibrary.Models;

namespace DigitalLibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleMenuMapsController : ControllerBase
    {
        private readonly DigitalLibraryDbContext _context;

        public RoleMenuMapsController(DigitalLibraryDbContext context)
        {
            _context = context;
        }

        // GET: api/RoleMenuMaps
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoleMenuMap>>> GetRoleMenuMaps()
        {
            return await _context.RoleMenuMaps.ToListAsync();
        }

        // GET: api/RoleMenuMaps/5
        
        [HttpGet("{roleId}")]
        public async Task<ActionResult<IEnumerable<RoleMenuMap>>> GetRoleMenuMap(int roleId)
        {
            var roleMenuMaps = await _context.RoleMenuMaps
                .Where(r => r.RoleId == roleId)
                .ToListAsync();

            if (roleMenuMaps == null || !roleMenuMaps.Any())
            {
                return NotFound();
            }

            return roleMenuMaps;
        }

        // PUT: api/RoleMenuMaps/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRoleMenuMap(int id, RoleMenuMap roleMenuMap)
        {
            if (id != roleMenuMap.Id)
            {
                return BadRequest();
            }

            _context.Entry(roleMenuMap).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoleMenuMapExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/RoleMenuMaps
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RoleMenuMap>> PostRoleMenuMap(RoleMenuMap roleMenuMap)
        {
            _context.RoleMenuMaps.Add(roleMenuMap);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRoleMenuMap", new { id = roleMenuMap.Id }, roleMenuMap);
        }

        // DELETE: api/RoleMenuMaps/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoleMenuMap(int id)
        {
            var roleMenuMap = await _context.RoleMenuMaps.FindAsync(id);
            if (roleMenuMap == null)
            {
                return NotFound();
            }

            _context.RoleMenuMaps.Remove(roleMenuMap);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RoleMenuMapExists(int id)
        {
            return _context.RoleMenuMaps.Any(e => e.Id == id);
        }
    }
}
