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
    public class BookTransController : ControllerBase
    {
        private readonly DigitalLibraryDbContext _context;

        public BookTransController(DigitalLibraryDbContext context)
        {
            _context = context;
        }

        // GET: api/BookTrans
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookTran>>> GetBookTrans()
        {
            return await _context.BookTrans.ToListAsync();
        }

        // GET: api/BookTrans/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BookTran>> GetBookTran(int id)
        {
            var bookTran = await _context.BookTrans.FindAsync(id);

            if (bookTran == null)
            {
                return NotFound();
            }

            return bookTran;
        }

        // PUT: api/BookTrans/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookTran(int id, BookTran bookTran)
        {
            if (id != bookTran.BookTranId)
            {
                return BadRequest();
            }

            _context.Entry(bookTran).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookTranExists(id))
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

        // POST: api/BookTrans
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BookTran>> PostBookTran(BookTran bookTran)
        {
            _context.BookTrans.Add(bookTran);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBookTran", new { id = bookTran.BookTranId }, bookTran);
        }

        // DELETE: api/BookTrans/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookTran(int id)
        {
            var bookTran = await _context.BookTrans.FindAsync(id);
            if (bookTran == null)
            {
                return NotFound();
            }

            _context.BookTrans.Remove(bookTran);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookTranExists(int id)
        {
            return _context.BookTrans.Any(e => e.BookTranId == id);
        }
    }
}
