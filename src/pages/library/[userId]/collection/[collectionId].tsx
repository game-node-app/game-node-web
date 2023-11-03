import React from "react";
import { useRouter } from "next/router";
import LibraryView from "@/components/library/view/LibraryView";
import CollectionView from "@/components/collection/view/CollectionView";

const Collection = () => {
    const router = useRouter();
    const { userId, collectionId } = router.query;
    return (
        <LibraryView userId={userId as string | undefined}>
            <CollectionView collectionId={collectionId as string} />
        </LibraryView>
    );
};

export default Collection;
