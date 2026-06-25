import { GetCredentialsForUser } from "@/actions/credentials/getCredentialsForUser";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, LockIcon, ShieldCheckIcon } from "lucide-react";
import { Suspense } from "react";
import CreateCredentialDialog from "./_components/CreateCredentialDialog";
import CredentialCard from "./_components/CredentialCard";

function page() {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Credentials</h1>
          <p className="text-muted-foreground">Manage your credentials</p>
        </div>
        <CreateCredentialDialog />
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
          <div className="flex items-center justify-center w-8 h-8 bg-emerald-500 rounded-full">
            <ShieldCheckIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-emerald-700 dark:text-emerald-400">
              Encryption
            </p>
            <p className="text-sm text-emerald-600 dark:text-emerald-500">
              All information is securely encrypted, ensuring your data remains
              safe
            </p>
          </div>
        </div>
      </div>

      <div className="h-full py-6">
        <Suspense fallback={<UserCredentialsSkeleton />}>
          <UserCredentials />
        </Suspense>
      </div>
    </div>
  );
}

function UserCredentialsSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-20 w-full" />
      ))}
    </div>
  );
}

async function UserCredentials() {
  const credentials = await GetCredentialsForUser();

  if (!credentials) {
    return (
      <Alert variant={"destructive"}>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (credentials.length === 0) {
    return (
      <div className="flex flex-col gap-4 h-full items-center justify-center">
        <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
          <LockIcon size={40} className="stroke-emerald-400" />
        </div>
        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold">No credentials created yet</p>
          <p className="text-sm text-muted-foreground">
            Click the button below to create your first credential
          </p>
        </div>
        <CreateCredentialDialog triggerText="Create your first Credential" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {credentials.map((credential: any) => (
        <CredentialCard key={credential.id} credential={credential} />
      ))}
    </div>
  );
}

export default page;
