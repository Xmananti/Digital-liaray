using System;
using System.Collections.Generic;

namespace DigitalLibrary.Models;

public partial class Category
{
    public int CategoryId { get; set; }

    public string? CategoryName { get; set; }

    public string? CreatedBy { get; set; }

    public DateOnly? CreatedDate { get; set; }

    public string? Modifiedby { get; set; }

    public DateOnly? ModifiedDate { get; set; }

    public virtual ICollection<Book> Books { get; set; } = new List<Book>();
}
