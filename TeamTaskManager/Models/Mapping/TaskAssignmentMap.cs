﻿using System.Data.Entity.ModelConfiguration;

namespace TeamTaskManager.Models.Mapping
{
    public class TaskAssignmentMap : EntityTypeConfiguration<TaskAssignment>
    {
        public TaskAssignmentMap()
        {
            this.HasKey(t => new { t.PlayerId, t.GameId, t.TaskId });

            this.HasRequired(t => t.Game)
                  .WithMany(t => t.TaskAssignments)
                  .HasForeignKey(g => g.GameId)
                  .WillCascadeOnDelete(false);

            this.HasRequired(t => t.Task)
                 .WithMany(t => t.TaskAssignments)
                     .HasForeignKey(t => t.TaskId)
                     .WillCascadeOnDelete(false);
            this.HasRequired(t => t.Player)
                    .WithMany(t => t.TaskAssignments)
                  .HasForeignKey(p => p.PlayerId)
                  .WillCascadeOnDelete(false);
        }
    }
}