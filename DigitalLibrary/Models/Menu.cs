using System;
using System.Collections.Generic;

namespace DigitalLibrary.Models;

public partial class Menu
{
    public int MenuId { get; set; }

    public string MenuName { get; set; } = null!;

    public string? CreatedBy { get; set; }

    public DateOnly? CreatedDate { get; set; }

    public string? Modifiedby { get; set; }

    public DateOnly? ModifiedDate { get; set; }

    public virtual ICollection<RoleMenuMap> RoleMenuMaps { get; set; } = new List<RoleMenuMap>();
}
