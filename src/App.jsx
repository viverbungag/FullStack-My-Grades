import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const grades = [{
  label: "A",
  value: 4
},
{
  label: "B+",
  value: 3.5
},
{
  label: "B",
  value: 3
},
{
  label: "C+",
  value: 2.5
},
{
  label: "C",
  value: 2
},
{
  label: "D",
  value: 1
},
{
  label: "F",
  value: 0
}
]

const getGradeValue = (grade) => {
  const gradeObj = grades.find(g => g.label === grade)
  return gradeObj.value
}

const inputFields = [
  {
    label: "Course No: ",
    name: "courseNo",
    type: "text"
  },
  {
    label: "Course Name: ",
    name: "courseName",
    type: "text"
  },
  {
    label: "Units: ",
    name: "units",
    type: "number"
  }
]


function App() {
  const [count, setCount] = useState(0)
  const [courses, setCourses] = useState([{
    courseNo: 1,
    courseName: 'React',
    units: 3,
    grade: 'A'
  }])

  const [userInput, setUserInput] = useState({
    courseNo: '',
    courseName: '',
    units: '',
    grade: 'A'
  })

  const [searchInput, setSearchInput] = useState('')


  const onCourseAdd = () => {
    setCourses(prev => ([...prev, userInput]))
    setUserInput({
      courseNo: '',
      courseName: '',
      units: '',
      grade: 'A'
    })
  }

  const inputOnChange = (e) => {
    const { name, value } = e.target
    setUserInput(prev => ({ ...prev, [name]: value }))
  }

  const radioInputOnChange = (e) => {
    const { name, value } = e.target
    setUserInput(prev => ({ ...prev, [name]: value }))
  }

  const calculateQPI = () => {
    const totalUnits = courses.reduce((acc, curr) => acc + Number(curr.units || 0), 0)
    const totalGrade = courses.reduce((acc, curr) => acc + getGradeValue(curr.grade) * Number(curr.units || 0), 0)
    return totalGrade / totalUnits
  }


  return (
    <div className="flex">
      <div className=" flex flex-col gap-12 p-8 border-r-2 border-black">
        <div className="flex flex-col gap-4 items-end">
          {inputFields.map((field, idx) => (
            <div key={idx + field.type + field.name} className="flex gap-4">
              <span>{field.label}</span>
              <input type={field.type} value={userInput[field.name]} onChange={inputOnChange} name={field.name} />
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <span>Grade:</span>
          <div className="flex flex-col gap-4 items-start">
            {grades.map((grade, idx) => (
              <div key={idx + grade.label + grade.value}>
                <input type="radio" name="grade" value={grade.label} id={grade.label} onChange={radioInputOnChange} checked={grade.label === userInput.grade} />
                <label htmlFor={grade.label}>{grade.label}</label>
              </div>
            ))}
          </div>
          <div>
          </div>
        </div>
        <button onClick={onCourseAdd}>Submit</button>
      </div>
      <div>
        <div className="flex gap-8 flex-col p-8">
          <div className="flex gap-8 justify-center">
            <span>Search: </span>
            <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
          </div>
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left text-gray-600 uppercase font-medium tracking-wider">Course No.</th>
                <th className="px-4 py-2 text-left text-gray-600 uppercase font-medium tracking-wider">Course Name</th>
                <th className="px-4 py-2 text-left text-gray-600 uppercase font-medium tracking-wider">Units</th>
                <th className="px-4 py-2 text-left text-gray-600 uppercase font-medium tracking-wider">Grade</th>
              </tr>
            </thead>
            <tbody>
              {courses
                .filter(({ courseName, courseNo }) => courseName.toLowerCase().includes(searchInput.toLowerCase()) || String(courseNo).toLowerCase().includes(searchInput.toLowerCase()))
                .map((course, idx) => (
                  <tr key={idx + course.courseNo + course.courseName + course.units + course.grade} className='bg-gray-100'>
                    <td className="border px-4 py-2 text-gray-800">{course.courseNo}</td>
                    <td className="border px-4 py-2 text-gray-800">{course.courseName}</td>
                    <td className="border px-4 py-2 text-gray-800">{course.units}</td>
                    <td className="border px-4 py-2 text-gray-800">{course.grade}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <span>{`Total QPI: ${calculateQPI()}`}</span>
      </div>
    </div>
  )
}

export default App
