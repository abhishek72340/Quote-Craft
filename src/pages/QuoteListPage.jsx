import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HOC from "../components/HOC";
function QuotePage() {
  const [quotes, setQuotes] = useState([]);
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hasMore && !loading) {
      fetchQuotes();
    }
  }, [offset]);

  const fetchQuotes = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const res = await fetch(
        `https://assignment.stage.crafto.app/getQuotes?limit=${limit}&offset=${offset}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (res.ok) {
        const { data } = await res.json();
        console.log(data);
        if (data.length < limit) {
          setHasMore(false);
        }
        setQuotes((prev) => [...prev, ...data]);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.log(err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreQuotes = () => {
    setOffset((prev) => prev + limit);
  };

  return (
    <div className="relative min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-6 underline">
        Quotes
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {quotes.map((quote) => (
          <div
            key={quote.id}
            className="relative bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={quote.mediaUrl}
              alt={quote.text}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <p className="text-white text-xl text-center px-4">
                {quote.text}
              </p>
            </div>
            <div className="p-4">
              <p className="text-gray-700 font-semibold">{quote.username}</p>
              <p className="text-gray-500 text-sm">
                {new Date(quote.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMoreQuotes}
            disabled={loading}
            className="px-4 py-2 font-semibold text-white bg-black rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? "Loading..." : "Load More Quotes"}
          </button>
        </div>
      )}
      <Link to="/quote-creation">
        <button className="fixed bottom-8 right-8 bg-black text-white rounded-full p-4 shadow-lg hover:bg-indigo-600 outline-none">
          Create Quotes +
        </button>
      </Link>
    </div>
  );
}

export default HOC(QuotePage);
