import Navbar from "../components/ui/Navbar";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [resumeQuiz, setResumeQuiz] = useState(null);
  const [lastResults, setLastResults] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then(res => res.json())
      .then(data => setCategories(data.trivia_categories));

    const saved = localStorage.getItem("currentQuiz");
    if (saved) setResumeQuiz(JSON.parse(saved));

    const last = localStorage.getItem("lastQuiz");
    if (last) setLastResults(JSON.parse(last));
  }, []);

  const startQuiz = () => {
    if (!selectedCategory) return;
    navigate(`/quiz/${selectedCategory.id}`);
  };

  const resumeExistingQuiz = () => {
    if (!resumeQuiz) return;
    navigate(`/quiz/${resumeQuiz.categoryId}`);
  };

  const renderResults = () => {
    if (!lastResults) return null;
    const correct = lastResults.filter(r => r.answer === r.correct).length;
    const wrong = lastResults.filter(r => r.answer !== r.correct).length;

    return (
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Last Quiz Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Total Questions: {lastResults.length}</p>
          <p>Correct: {correct}</p>
          <p>Wrong: {wrong}</p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 pt-24 max-w-4xl mx-auto">
        {renderResults()}

        {resumeQuiz && (
          <Card className="mb-6 cursor-pointer hover:shadow-lg transition">
            <CardHeader>
              <CardTitle>Resume Your Quiz</CardTitle>
              <CardDescription>Click below to continue where you left off</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={resumeExistingQuiz}>Resume Quiz</Button>
            </CardContent>
          </Card>
        )}

        <h2 className="text-xl font-bold mb-4">Choose a Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(cat => (
            <Card
              key={cat.id}
              onClick={() => setSelectedCategory(cat)}
              className={`cursor-pointer hover:shadow-lg transition ${selectedCategory?.id === cat.id ? "border-2 border-blue-500" : ""}`}
            >
              <CardHeader>
                <CardTitle>{cat.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedCategory?.id === cat.id && (
                  <Button className="mt-2" onClick={startQuiz}>Start Quiz</Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
