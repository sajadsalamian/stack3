import Header from "@/Components/Layouts/Main/Header";
import Footer from "@/Components/Layouts/Main/Footer";
import { ToastContainer } from "react-toastify";
import { Head, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import { WagmiProvider } from "wagmi";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { createAppKit } from "@reown/appkit/react";
import { sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


// 0. Setup queryClient
const queryClient = new QueryClient();
const projectId = "4b8cc3a1ad33e02f08811b9fa2782a5a";

const metadata = {
    name: "AppKit",
    description: "AppKit Example",
    url: "https://stack3.ir", // origin must match your domain & subdomain
    icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// 3. Set the networks
const networks = [sepolia];

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
    networks,
    projectId,
    ssr: true,
});

// 5. Create modal
createAppKit({
    adapters: [wagmiAdapter],
    networks,
    projectId,
    metadata,
    features: {
        socials: false,
        email: false, // default tao true
        analytics: true, // Optional - defaults to your Cloud configuration
    },
    allWallets: "SHOW", // default to SHOW
});


export default function Main({ children = null }) {
    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <div className="min-h-screen flex flex-col">
                    <ToastContainer />
                    <Header />
                    {children}
                    <Footer />
                </div>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

export function HeadMeta({
    children = null,
    title,
    description,
    keywords,
}): React.JSX.Element {
    const shared = usePage().props;

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keyword" content={keywords} />
            {children}
        </Head>
    );
}
