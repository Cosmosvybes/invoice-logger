import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../States/hoooks/hook';
import { fetchBroadcast } from '../../../../States/Slices/admin';
import { InformationRectangle, CheckCircle } from 'react-huge-icons/solid';

const SystemBanner = () => {
    const dispatch = useAppDispatch();
    const { broadcast } = useAppSelector((state) => state.admin);

    useEffect(() => {
        dispatch(fetchBroadcast());
        // Poll every 5 minutes for updates
        const interval = setInterval(() => {
            dispatch(fetchBroadcast());
        }, 300000);
        return () => clearInterval(interval);
    }, [dispatch]);

    if (!broadcast || !broadcast.isActive || !broadcast.message) return null;

    const styles = {
        info: {
            bg: 'bg-blue-600',
            icon: <InformationRectangle className="text-xl" />,
            label: 'RELEASE UPDATE'
        },
        warning: {
            bg: 'bg-amber-500',
            icon: <InformationRectangle className="text-xl" />,
            label: 'SYSTEM NOTICE'
        },
        maintenance: {
            bg: 'bg-slate-900',
            icon: <InformationRectangle className="text-xl" />,
            label: 'MAINTENANCE'
        }
    };

    const currentStyle = styles[broadcast.type] || styles.info;

    return (
        <div className={`w-full ${currentStyle.bg} text-white py-3 px-6 flex items-center justify-between relative z-[100] animate-in slide-in-from-top duration-500`}>
            <div className="flex items-center gap-4 mx-auto max-w-7xl w-full">
                <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-[10px] font-black tracking-widest shrink-0">
                    {currentStyle.icon}
                    {currentStyle.label}
                </div>
                <p className="text-sm font-bold tracking-tight truncate">
                    {broadcast.message}
                </p>
                <div className="flex items-center gap-2 shrink-0 ml-auto max-sm:hidden">
                    <CheckCircle className="text-white/40" />
                    <span className="text-[10px] font-bold text-white/60">LIVE BROADCAST</span>
                </div>
            </div>
        </div>
    );
};

export default SystemBanner;
