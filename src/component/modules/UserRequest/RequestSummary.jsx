function RequestSummary({ category, date, totalCount, viewedCount }) {
    return (  
        <div>
            <table className="w-full border-collapse">
                <tbody>

                    <tr>
                        <td className="border-b p-2">
                            <p className="font-semibold text-[12px]">Category:</p>
                            <p className="text-[16px]">{category}</p>
                        </td>
                        <td className="border-b p-2">
                            <p className="font-semibold text-[12px]">Date</p>
                            <p className="text-[16px]">{date}</p>
                        </td>
                    </tr>
                    <tr>
                        <td className="border-b p-2">
                            <p className="font-semibold text-[12px]">Sent: </p>
                            <p>{totalCount}</p>
                        </td>
                        <td className="border-b p-2">
                            <p className="font-semibold text-[12px]">Viewed: </p>
                            <p>{viewedCount}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default RequestSummary;