using System;
using System.Collections.Generic;

namespace DigitalLibrary.Models;

public partial class RoleMenuMap
{
    public int Id { get; set; }

    public int? RoleId { get; set; }

    public int? MenuId { get; set; }

    public virtual Menu? Menu { get; set; }

    public virtual Role? Role { get; set; }
}
