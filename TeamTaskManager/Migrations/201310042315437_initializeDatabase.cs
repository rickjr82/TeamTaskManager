namespace TeamTaskManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initializeDatabase : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Game",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Time = c.DateTime(nullable: false),
                        Location = c.String(nullable: false, maxLength: 50),
                        Opponent = c.String(nullable: false, maxLength: 50),
                        TeamId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Team", t => t.TeamId, cascadeDelete: true)
                .Index(t => t.TeamId);
            
            CreateTable(
                "dbo.Team",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 50),
                        UserProfile_UserId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.UserProfile", t => t.UserProfile_UserId)
                .Index(t => t.UserProfile_UserId);
            
            CreateTable(
                "dbo.Player",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FirstName = c.String(nullable: false, maxLength: 50),
                        LastName = c.String(nullable: false, maxLength: 50),
                        TeamId = c.Int(nullable: false),
                        UserId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Team", t => t.TeamId, cascadeDelete: true)
                .ForeignKey("dbo.UserProfile", t => t.UserId)
                .Index(t => t.TeamId)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.UserProfile",
                c => new
                    {
                        UserId = c.Int(nullable: false, identity: true),
                        UserName = c.String(maxLength: 4000),
                        IsAdmin = c.Boolean(),
                    })
                .PrimaryKey(t => t.UserId);
            
            CreateTable(
                "dbo.TaskAssignments",
                c => new
                    {
                        PlayerId = c.Int(nullable: false),
                        GameId = c.Int(nullable: false),
                        TaskId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.PlayerId, t.GameId, t.TaskId })
                .ForeignKey("dbo.Player", t => t.PlayerId)
                .ForeignKey("dbo.Task", t => t.TaskId)
                .ForeignKey("dbo.Game", t => t.GameId)
                .Index(t => t.PlayerId)
                .Index(t => t.TaskId)
                .Index(t => t.GameId);
            
            CreateTable(
                "dbo.Task",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 50),
                        Description = c.String(maxLength: 100),
                        TeamId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Team", t => t.TeamId, cascadeDelete: true)
                .Index(t => t.TeamId);
            
            CreateTable(
                "dbo.TeamUserProfiles",
                c => new
                    {
                        Team_Id = c.Int(nullable: false),
                        UserProfile_UserId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Team_Id, t.UserProfile_UserId })
                .ForeignKey("dbo.Team", t => t.Team_Id, cascadeDelete: true)
                .ForeignKey("dbo.UserProfile", t => t.UserProfile_UserId, cascadeDelete: true)
                .Index(t => t.Team_Id)
                .Index(t => t.UserProfile_UserId);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.TeamUserProfiles", new[] { "UserProfile_UserId" });
            DropIndex("dbo.TeamUserProfiles", new[] { "Team_Id" });
            DropIndex("dbo.Task", new[] { "TeamId" });
            DropIndex("dbo.TaskAssignments", new[] { "GameId" });
            DropIndex("dbo.TaskAssignments", new[] { "TaskId" });
            DropIndex("dbo.TaskAssignments", new[] { "PlayerId" });
            DropIndex("dbo.Player", new[] { "UserId" });
            DropIndex("dbo.Player", new[] { "TeamId" });
            DropIndex("dbo.Team", new[] { "UserProfile_UserId" });
            DropIndex("dbo.Game", new[] { "TeamId" });
            DropForeignKey("dbo.TeamUserProfiles", "UserProfile_UserId", "dbo.UserProfile");
            DropForeignKey("dbo.TeamUserProfiles", "Team_Id", "dbo.Team");
            DropForeignKey("dbo.Task", "TeamId", "dbo.Team");
            DropForeignKey("dbo.TaskAssignments", "GameId", "dbo.Game");
            DropForeignKey("dbo.TaskAssignments", "TaskId", "dbo.Task");
            DropForeignKey("dbo.TaskAssignments", "PlayerId", "dbo.Player");
            DropForeignKey("dbo.Player", "UserId", "dbo.UserProfile");
            DropForeignKey("dbo.Player", "TeamId", "dbo.Team");
            DropForeignKey("dbo.Team", "UserProfile_UserId", "dbo.UserProfile");
            DropForeignKey("dbo.Game", "TeamId", "dbo.Team");
            DropTable("dbo.TeamUserProfiles");
            DropTable("dbo.Task");
            DropTable("dbo.TaskAssignments");
            DropTable("dbo.UserProfile");
            DropTable("dbo.Player");
            DropTable("dbo.Team");
            DropTable("dbo.Game");
        }
    }
}
