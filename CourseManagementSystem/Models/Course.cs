

namespace CourseManagementSystem.Models
{
    public class Course
    {
        public int Id { get; set; }
        public string CourseName { get; set; } = null!;
        public int DurationInHours { get; set; }
        public decimal Fee { get; set; }
    }
}