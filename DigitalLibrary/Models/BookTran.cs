using System;
using System.Collections.Generic;

namespace DigitalLibrary.Models;

public partial class BookTran
{
    public int BookTranId { get; set; }

    public int? BookId { get; set; }

    public int? UserId { get; set; }

    public DateOnly? IssueDate { get; set; }

    public DateOnly? ReturnedDate { get; set; }

    public string? Status { get; set; }

    public string? Comments { get; set; }


    public virtual Book? Book { get; set; }

    public virtual User? User { get; set; }
}
