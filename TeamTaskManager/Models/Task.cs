using System;
using System.Collections.Generic;

namespace TeamTaskManager.Models
{
    public partial class Task
    {
        public Task()
        {
            this.TeamGameTasks = new List<TeamGameTask>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public virtual ICollection<TeamGameTask> TeamGameTasks { get; set; }
    }
}
