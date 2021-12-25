import React, { ProfilerOnRenderCallback } from "react";
import { ProfilerProps } from "react";

export type Props = { metadata?: any; phases?: ("mount" | "update")[] } & Omit<
  ProfilerProps,
  "onRender"
>;
let queue: unknown[] = [];
const sendProfilerQueue = () => {
  if (!queue.length) {
    return;
  }
  const queueToSend = [...queue];
  queue = [];
  console.log(queueToSend);
};
setInterval(sendProfilerQueue, 5000);

export const Profiler = ({ metadata, phases, ...props }: Props) => {
  const reportProfiler: ProfilerOnRenderCallback = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions
  ) => {
    if (!phases || phases.includes(phase)) {
      queue.push({
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions,
        metadata,
      });
    }
  };
  return <React.Profiler onRender={reportProfiler} {...props} />;
};
