import { Key } from "react";

export default function Table({ headers = [], data = [] }) {
  return (
    <div className="w-full shadow-xl">
      <table className="w-full overflow-x-auto md:table-fixed">
        <thead className="">
          <tr>
            <th className={"text-center py-3 px-4 text-sm text-primary"}>#</th>
            {headers.map((item: String, index: Key) => (
              <th
                className={"text-center py-3 px-4 text-sm text-primary"}
                key={index}
              >
                {item.replace(/_/g, "")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {data.map((item, index) => (
            <tr className="bg-[#666666] text-white border-b-4 border-dark-black rounded-lg">
              <td
                className={`text-center py-3 px-4 text-sm text-black ${
                  item.isSelf == "1" && "font-bold"
                }`}
              >
                {index + 1}
              </td>
              {headers.map((head: String, index: Key) => (
                <td className={`text-center py-3 px-4 text-sm`} key={index}>
                  {head.includes("image") ? (
                    <img
                      src={item[head]}
                      className="w-16 h-16 rounded-full object-cover"
                      alt="بدون تصویر"
                    />
                  ) : (
                    <span className={item.isSelf == "1" && "font-bold text-primary"}>
                      {item[head]}
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
