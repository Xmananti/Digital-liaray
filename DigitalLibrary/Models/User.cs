using System;
using System.Collections.Generic;

namespace DigitalLibrary.Models;

public partial class User
{
    public int UserId { get; set; }

    public string UserName { get; set; } = null!;

    public string UserPassword { get; set; } = null!;

    public int? RoleId { get; set; }

    public string? CreatedBy { get; set; }

    public DateOnly? CreatedDate { get; set; }

    public string? Modifiedby { get; set; }

    public DateOnly? ModifiedDate { get; set; }

    public virtual ICollection<BookTran> BookTrans { get; set; } = new List<BookTran>();

    public virtual Role? Role { get; set; }
}
