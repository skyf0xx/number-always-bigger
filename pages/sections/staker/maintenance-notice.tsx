import { Construction } from 'lucide-react';
import Image from 'next/image';

export const MaintenanceNotice = () => (
    <div className="mt-8 bg-moon-yellow/20 border-2 border-moon-yellow rounded-lg p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)] animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="text-center">
                <Construction className="h-12 w-12 mx-auto mb-4 text-moon-yellow animate-bounce" />
                <h3 className="text-2xl font-comic mb-2">
                    number printer go brrr... but quieter
                </h3>
                <p className="text-lg font-comic mb-4">
                    we&apos;re making the number even bigger by upgrading our
                    smart contracts!
                </p>
                <p className="text-sm font-comic text-gray-600">
                    rewards are paused for maintenance
                    <br />
                    (don&apos;t worry, we&apos;ll be back soon™️)
                </p>
                <div className="mt-4 space-y-1 text-xs font-comic text-gray-500">
                    <p>your tokens are safe</p>
                    <p>your can stake and unstake shortly</p>
                    <p>number will still go up</p>
                    <p>
                        See our{' '}
                        <a target="_blank" href="https://x.com/AlwaysBigger">
                            twitter
                        </a>{' '}
                        for updates
                    </p>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <Image
                    width={500}
                    height={500}
                    src="./teacher_pepe.jpg"
                    alt="Maintenance"
                    className="max-w-full h-auto max-h-64 object-contain"
                />
            </div>
        </div>
    </div>
);
