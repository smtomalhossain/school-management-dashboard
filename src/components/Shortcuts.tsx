import Link from "next/link";

const Shortcuts = () => {
    return (
        <div className="bg-white p-4 rounded-md">
            <h1 className="text-xl font-semibold">Shortcuts</h1>
            <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
                <Link className="p-3 rounded-md bg-tomSkyLight" href="/">Teacher&apos;s Classes</Link>
                <Link className="p-3 rounded-md bg-tomSkyLight" href="/">Teacher&apos;s Lessons</Link>
                <Link className="p-3 rounded-md bg-tomSkyLight" href="/">Teacher&apos;s Students</Link>
                <Link className="p-3 rounded-md bg-tomSkyLight" href="/">Teacher&apos;s Exams</Link>
                <Link className="p-3 rounded-md bg-tomSkyLight" href="/">Teacher&apos;s Assignments</Link>
            </div>
        </div>
    );
}

export default Shortcuts;
