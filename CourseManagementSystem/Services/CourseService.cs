using CourseManagementSystem.DTOs;
using CourseManagementSystem.Models;
using CourseManagementSystem.Repositories;

namespace CourseManagementSystem.Services
{
    public class CourseService : ICourseService
    {
        private readonly ICourseRepository _repo;

        public CourseService(ICourseRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<CourseReadDto>> GetAllAsync()
        {
            var courses = await _repo.GetAllAsync();

            // Manual mapping
            return courses.Select(c => new CourseReadDto
            {
                Id = c.Id,
                CourseName = c.CourseName,
                DurationInHours = c.DurationInHours,
                Fee = c.Fee
            });
        }

        public async Task<CourseReadDto?> GetByIdAsync(int id)
        {
            var course = await _repo.GetByIdAsync(id);
            if (course == null) return null;

            return new CourseReadDto
            {
                Id = course.Id,
                CourseName = course.CourseName,
                DurationInHours = course.DurationInHours,
                Fee = course.Fee
            };
        }

        public async Task<CourseReadDto> CreateAsync(CourseCreateDto dto)
        {
            var course = new Course
            {
                CourseName = dto.CourseName,
                DurationInHours = dto.DurationInHours,
                Fee = dto.Fee
            };

            await _repo.AddAsync(course);
            await _repo.SaveChangesAsync();

            return new CourseReadDto
            {
                Id = course.Id,
                CourseName = course.CourseName,
                DurationInHours = course.DurationInHours,
                Fee = course.Fee
            };
        }

        public async Task<bool> UpdateAsync(int id, CourseUpdateDto dto)
        {
            var course = await _repo.GetByIdAsync(id);
            if (course == null) return false;

            // Apply changes (DTO -> Entity)
            course.CourseName = dto.CourseName;
            course.DurationInHours = dto.DurationInHours;
            course.Fee = dto.Fee;

            _repo.Update(course);
            await _repo.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var course = await _repo.GetByIdAsync(id);
            if (course == null) return false;

            _repo.Delete(course);
            await _repo.SaveChangesAsync();
            return true;
        }
    }
}