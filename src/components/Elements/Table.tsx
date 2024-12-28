import { Key } from "react";

export default function Table({ headers = [], data = [] }) {
  return (
    <div className="w-full pb-20">
      <table className="w-full overflow-x-auto md:table-fixed  overflow-y-auto">
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
          {data.map((item: { isSelf: String }, index) => (
            <tr
              className={`bg-[#666666] text-white border-b-4 border-dark-black rounded-lg`}
              key={index}
            >
              <td
                className={`text-center py-3 px-4 text-sm ${
                  item.isSelf == "1" ? "text-primary font-bold" : "text-white"
                }`}
              >
                {index + 1}
              </td>
              {headers.map((head: String, index1: Key) => (
                <td className={`text-center py-3 px-4 text-sm`} key={index1}>
                  <span
                    className={
                      item.isSelf == "1" ? "font-bold text-primary" : ""
                    }
                  >
                    {item[head]}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
