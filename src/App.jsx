import { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

const App = () => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);
  const [menuOpen, setMenuOpen] = useState(true);

  const inputRef = useRef(null);

  const technologies = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Nextjs",
    "TypeScript",
    "Nodejs",
    "Expressjs",
    "MongoDB",
    "MySQL",
  ];

  const filteredTechnologies = technologies.filter(
    (item) =>
      item?.toLocaleLowerCase()?.includes(query.toLocaleLowerCase()?.trim()) &&
      !selected.includes(item)
  );

  const isDisable =
    !query?.trim() ||
    selected.filter(
      (item) =>
        item?.toLocaleLowerCase()?.trim() === query?.toLocaleLowerCase()?.trim()
    )?.length;

  return (
    <div className='kzui-wrapper'>
      <div className='kzui-container'>
        {selected?.length ? (
          <div className='kzui-selected'>
            {selected.map((tag) => {
              return (
                <div key={tag} className='kzui-tech'>
                  {tag}
                  <div
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() =>
                      setSelected(selected.filter((i) => i !== tag))
                    }
                  >
                    <IoMdClose />
                  </div>
                </div>
              );
            })}
            <div className='kzui-clear-all'>
              <span
                className='kzui-clear'
                onClick={() => {
                  setSelected([]);
                  inputRef.current?.focus();
                }}
              >
                Clear all
              </span>
            </div>
          </div>
        ) : null}
        <div className='kzui-search'>
          <IoSearch className='kzui-search-icon' />

          <input
            ref={inputRef}
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value.trimStart())}
            placeholder='Search or Create technologies'
            className='kzui-input'
            onFocus={() => setMenuOpen(true)}
            onBlur={() => setMenuOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isDisable) {
                setSelected((prev) => [...prev, query]);
                setQuery("");
                setMenuOpen(true);
              }
            }}
          />
          <button
            className='kzui-add'
            disabled={isDisable}
            onClick={() => {
              if (isDisable) {
                return;
              }
              setSelected((prev) => [...prev, query]);
              setQuery("");
              inputRef.current?.focus();
              setMenuOpen(true);
            }}
          >
            + Add
          </button>
        </div>

        {/* Menu's */}
        {menuOpen ? (
          <div className='kzui-lists kzui-scrollbar'>
            <ul className='kzui-list-container kzui-scrollbar'>
              {filteredTechnologies?.length ? (
                filteredTechnologies.map((tag, i) => (
                  <li
                    key={tag}
                    className='kzui-list'
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setMenuOpen(true);
                      setSelected((prev) => [...prev, tag]);
                      setQuery("");
                    }}
                  >
                    {tag}
                  </li>
                ))
              ) : (
                <li className='kzui-no-option'>No options available</li>
              )}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
