import useCreation from "../hook/useCreation";
import { useNavigate } from "react-router-dom";
import HOC from "../components/HOC";
function QuoteCreationPage() {
  const {
    mediaUrl,
    fileChangeHandler,
    handleFileUpload,
    changeHandler,
    handleSubmit,
    quote,
  } = useCreation();

  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-end m-3">
        <button
          className="bg-black text-white p-2 hover:bg-indigo-600 "
          onClick={() => navigate("/quote-list")}
        >
          Go To Quote Page
        </button>
      </div>
      <div className="flex items-center justify-center ">
        <div className="w-full max-w-md p-8 space-y-6 bg-white border rounded-lg">
          <h2 className="text-2xl font-bold text-center text-gray-700 ">
            Upload Image
          </h2>
          <form onSubmit={handleFileUpload} className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center w-full p-4 border-2 border-dashed border-gray-300 rounded-md cursor-pointer">
                <span className="mt-2 text-sm leading-normal">
                  {/* Select a file */}
                </span>
                <input
                  type="file"
                  onChange={fileChangeHandler}
                  //   className="hidden"
                  required
                />
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 font-semibold text-white bg-black rounded-md  outline-none hover:bg-indigo-600 "
              >
                Upload
              </button>
            </div>
          </form>
          {mediaUrl && (
            <p className="mt-4 text-center text-green-500">
              Uploaded File URL:{" "}
              <a
                href={mediaUrl}
                target="_blank"
                className="text-blue-500 underline"
              >
                {mediaUrl}
              </a>
            </p>
          )}

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-center text-gray-700">
              Create Quote
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="text"
                  className="block text-sm font-medium text-gray-700"
                >
                  Quote Text
                </label>
                <textarea
                  id="text"
                  name="text"
                  value={quote.text}
                  onChange={changeHandler}
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm outline-none sm:text-sm"
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 font-semibold text-white bg-black rounded-md  outline-none hover:bg-indigo-600 "
                >
                  Create Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default HOC(QuoteCreationPage);
