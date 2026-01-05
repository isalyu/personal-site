export function formatAge(startedAt: string | undefined, now: Date): string {
  if (!startedAt) return "-";
  const podStartDate = new Date(startedAt);

  const ms = Math.max(0, now.getTime() - podStartDate.getTime());
  const totalSeconds = Math.floor(ms / 1000);

  const minutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(totalSeconds / 3600);
  const days = Math.floor(totalSeconds / 86400);

  let years =
    now.getFullYear() -
    podStartDate.getFullYear() -
    (now <
    new Date(now.getFullYear(), podStartDate.getMonth(), podStartDate.getDate())
      ? 1
      : 0);

  if (years >= 1) {
    const lastAnniversary = new Date(
      podStartDate.getFullYear() + years,
      podStartDate.getMonth(),
      podStartDate.getDate()
    );
    const daysSince = Math.floor(
      (now.getTime() - lastAnniversary.getTime()) / 86400000
    );
    return `${years}y${daysSince}d`;
  }

  if (days >= 1) {
    const h = hours % 24;
    return `${days}d${h}h`;
  }

  if (hours >= 1) {
    return `${hours}h`;
  }

  const m = minutes;
  const s = totalSeconds % 60;
  return `${m}m${s}s`;
}
