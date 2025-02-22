// RightSidebar.tsx (Server Component)
import { fetchTopCommunities } from "@/lib/actions/community.actions";

const RightSidebar = async () => {
  try {
    const communities = await fetchTopCommunities();
    return (
      <section className="custom-scrollbar rightsidebar">
        {/* Suggested Communities */}
        <div className="flex flex-1 flex-col justify-start">
          <h3 className="text-heading4-medium text-light-1">
            Suggested Communities
          </h3>
          <ul className="mt-2">
            {communities.map((community) => (
              <li
                key={community.id}
                className="mb-2 p-2 bg-gray-800 rounded-md">
                <a
                  href={`/communities/${community.id}`}
                  className="flex items-center gap-2">
                  <img
                    src={community.image || "/default-community.png"}
                    alt={community.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-light-1">{community.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Failed to fetch communities:", error);
    return <p>Failed to load communities.</p>;
  }
};

export default RightSidebar;
