using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DigitalLibrary.Models;

public partial class DigitalLibraryDbContext : DbContext
{
    public DigitalLibraryDbContext()
    {
    }

    public DigitalLibraryDbContext(DbContextOptions<DigitalLibraryDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Book> Books { get; set; }

    public virtual DbSet<BookTran> BookTrans { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Menu> Menus { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<RoleMenuMap> RoleMenuMaps { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Book>(entity =>
        {
            entity.HasKey(e => e.BookId).HasName("PK__Book__3DE0C227CF0ACB39");

            entity.ToTable("Book");

            entity.Property(e => e.BookId).HasColumnName("BookID");
            entity.Property(e => e.AuthorName)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.BookName)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.NoOfBooks).HasColumnName("No_of_Books");
            entity.Property(e => e.Price).HasColumnName("price");

            entity.HasOne(d => d.Category).WithMany(p => p.Books)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK__Book__CategoryId__5629CD9C");
        });

        modelBuilder.Entity<BookTran>(entity =>
        {
            entity.HasKey(e => e.BookTranId).HasName("PK__BookTran__811EF59B88695FD6");

            entity.Property(e => e.BookTranId).HasColumnName("BookTranID");
            entity.Property(e => e.BookId).HasColumnName("BookID");
            entity.Property(e => e.Comments)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("comments");
            
            entity.Property(e => e.Status).HasMaxLength(50).IsUnicode(false).HasColumnName("status");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Book).WithMany(p => p.BookTrans)
                .HasForeignKey(d => d.BookId)
                .HasConstraintName("FK__BookTrans__BookI__59063A47");

            entity.HasOne(d => d.User).WithMany(p => p.BookTrans)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__BookTrans__UserI__59FA5E80");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__Category__19093A2BF9CC3751");

            entity.ToTable("Category");

            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.CategoryName)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.CreatedBy)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Modifiedby)
                .HasMaxLength(30)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Menu>(entity =>
        {
            entity.HasKey(e => e.MenuId).HasName("PK__Menus__C99ED25023DC608D");

            entity.Property(e => e.MenuId).HasColumnName("MenuID");
            entity.Property(e => e.CreatedBy)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.MenuName)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Modifiedby)
                .HasMaxLength(30)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PK__Roles__8AFACE3AD8E32E6D");

            entity.Property(e => e.RoleId).HasColumnName("RoleID");
            entity.Property(e => e.CreatedBy)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Modifiedby)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.RoleName)
                .HasMaxLength(30)
                .IsUnicode(false);
        });

        modelBuilder.Entity<RoleMenuMap>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__RoleMenu__3214EC072DC3A7E1");

            entity.ToTable("RoleMenuMap");

            entity.Property(e => e.RoleId).HasColumnName("RoleID");

            entity.HasOne(d => d.Menu).WithMany(p => p.RoleMenuMaps)
                .HasForeignKey(d => d.MenuId)
                .HasConstraintName("FK__RoleMenuM__MenuI__5165187F");

            entity.HasOne(d => d.Role).WithMany(p => p.RoleMenuMaps)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK__RoleMenuM__RoleI__5070F446");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__users__CB9A1CDF2A3F843D");

            entity.ToTable("users");

            entity.Property(e => e.UserId).HasColumnName("userID");
            entity.Property(e => e.CreatedBy)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Modifiedby)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.UserName)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("userName");
            entity.Property(e => e.UserPassword)
                .HasMaxLength(2555)
                .IsUnicode(false)
                .HasColumnName("userPassword");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK__users__RoleId__4D94879B");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
