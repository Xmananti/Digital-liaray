using System;
using System.Collections.Generic;

namespace DigitalLibrary.Models;

public partial class Book
{
    public int BookId { get; set; }

    public string? BookName { get; set; }

    public int? Price { get; set; }

    public string? AuthorName { get; set; }

    public int? NoOfBooks { get; set; }

    public int? CategoryId { get; set; }

    public virtual ICollection<BookTran> BookTrans { get; set; } = new List<BookTran>();

    public virtual Category? Category { get; set; }
}
