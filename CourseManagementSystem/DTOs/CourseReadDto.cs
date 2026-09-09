namespace CourseManagementSystem.DTOs
{
    public class CourseReadDto
    {
        public int Id { get; set; }
        public string CourseName { get; set; } = null!;
        public int DurationInHours { get; set; }
        public decimal Fee { get; set; }
    }
}