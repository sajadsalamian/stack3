import { Key } from "react";

export default function Table({ headers = [], data = [] }) {
  return (
    <div className="w-full shadow-xl">
      <table className="w-full bg-white overflow-x-auto md:table-fixed">
        <thead className="bg-primary">
          <tr>
            <th className={"text-center py-3 px-4 text-sm text-white"}>#</th>
            {headers.map((item: String, index: Key) => (
              <th
                className={"text-center py-3 px-4 text-sm text-white"}
                key={index}
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {data.map((item, index) => (
            <tr>
              <td className="text-center py-3 px-4 text-sm">{index + 1}</td>
              {headers.map((head: String, index: Key) => (
                <td className={`text-center py-3 px-4 text-sm ${data.isSelf != null &&data.isSelf && "text-bold"}`} key={index}>
                  {head.includes("image") ? (
                    <img
                      src={item[head]}
                      className="w-16 h-16 rounded-full object-cover"
                      alt="بدون تصویر"
                    />
                  ) : (
                    <span>{item[head]}</span>
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
