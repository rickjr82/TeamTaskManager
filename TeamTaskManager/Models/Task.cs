using System;
using System.Collections.Generic;

namespace TeamTaskManager.Models
{
    public partial class Task
    {
        public Task()
        {
       }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int TeamId { get; set; }
        public virtual Team Team { get; set; }
        public virtual List<TaskAssignment> TaskAssignments { get; set; }
    }
}
