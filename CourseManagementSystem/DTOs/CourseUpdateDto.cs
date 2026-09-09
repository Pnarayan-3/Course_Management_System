using System.ComponentModel.DataAnnotations;

namespace CourseManagementSystem.DTOs
{
    public class CourseUpdateDto
    {
        [Required]
        [MaxLength(200)]
        public string CourseName { get; set; } = null!;

        [Range(1, int.MaxValue)]
        public int DurationInHours { get; set; }

        [Range(0.01, double.MaxValue)]
        public decimal Fee { get; set; }
    }
}