const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <h4>total of {sum} exercises </h4>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const handleSuma = (parts) => {
  return parts.reduce((acc, part) => acc + part.exercises, 0);
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={handleSuma(course.parts)} />
    </div>
  );
};

export default Course;
