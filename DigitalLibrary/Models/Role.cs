using System;
using System.Collections.Generic;

namespace DigitalLibrary.Models;

public partial class Role
{
    public int RoleId { get; set; }

    public string RoleName { get; set; } = null!;

    public string? CreatedBy { get; set; }

    public DateOnly? CreatedDate { get; set; }

    public string? Modifiedby { get; set; }

    public DateOnly? ModifiedDate { get; set; }

    public virtual ICollection<RoleMenuMap> RoleMenuMaps { get; set; } = new List<RoleMenuMap>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
