type GAEvent = {
  eventName: string;
  experiment_id: string;
  label: string;
};

export function sendABTestEvent({ eventName, experiment_id, label }: GAEvent) {
  const group = Math.random() < 0.5 ? 'A' : 'B';

  window.gtag?.('event', eventName, {
    experiment_id: experiment_id,
    variant: group,
    label,
  });
}
