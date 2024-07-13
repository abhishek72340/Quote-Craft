import { useState } from "react";
import toast from "react-hot-toast";
const useCreation = () => {
  const [file, setFile] = useState(null);
  const [mediaUrl, setMediaUrl] = useState("");
  const [fileInput, setFileInput] = useState(Date.now());
  const [quote, setQuote] = useState({
    text: "",
    mediaUrl: "",
  });

  const fileChangeHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(
        "https://crafto.app/crafto/v1.0/media/assignment/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (res.ok) {
        const data = await res.json();
        const getUrl = data?.map((url) => url.url);
        const getMediaUrl = getUrl.toString();
        setMediaUrl(getMediaUrl);
        setQuote((prev) => ({ ...prev, mediaUrl: getMediaUrl }));
        toast.success("File Uploaded Successfully!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setQuote((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("https://assignment.stage.crafto.app/postQuote", {
        method: "POST",
        headers: {
          Authorization: ` ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: quote.text,
          mediaUrl: quote.mediaUrl,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        toast.success("Quote Created successfully!");
        setQuote({
          text: "",
          mediaUrl: "",
        });
        setMediaUrl("");
        setFileInput(Date.now());
      }
    } catch (err) {
      console.log(err);
    }
  };
  return {
    mediaUrl,
    file,
    fileChangeHandler,
    handleFileUpload,
    changeHandler,
    handleSubmit,
    quote,
    fileInput,
  };
};

export default useCreation;
