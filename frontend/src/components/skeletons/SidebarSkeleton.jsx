import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  // CREATE 8 SKELETON ITEMS
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      {/* Header */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full py-3">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-3">
            {/* Avatar Skeleton */}
            <div className="relative mx-auto lg:mx-0">
              <div
                className="bg-gray-200 animate-pulse h-12 w-12 rounded-full"
                aria-hidden="true"
              />
            </div>
            {/* User Info Skeleton */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div
                className="bg-gray-200 animate-pulse h-4 w-3/4 mb-2"
                aria-hidden="true"
              />
              <div
                className="bg-gray-200 animate-pulse h-3 w-1/2"
                aria-hidden="true"
              />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
