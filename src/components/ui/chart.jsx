import { createContext, useContext, useId } from "react";
import { ResponsiveContainer, Tooltip } from "recharts";

import { cn } from "@/lib/utils";

const ChartContext = createContext(null);

function useChart() {
  const context = useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

function ChartContainer({ id, className, children, config, ...props }) {
  const uniqueId = useId();
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "flex aspect-square justify-center text-xs [&_.recharts-sector]:outline-none",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

function ChartStyle({ id, config }) {
  const colorEntries = Object.entries(config).filter(([, cfg]) => cfg.color);

  if (colorEntries.length === 0) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `[data-chart=${id}] {\n${colorEntries
          .map(([key, cfg]) => `  --color-${key}: ${cfg.color};`)
          .join("\n")}\n}`,
      }}
    />
  );
}

const ChartTooltip = Tooltip;

function ChartTooltipContent({ active, payload, hideLabel, className }) {
  const { config } = useChart();

  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "min-w-32 rounded-lg border bg-popover px-2.5 py-1.5 text-xs shadow-md",
        className,
      )}
    >
      {payload.map((item, index) => {
        const key = item.dataKey ?? item.name;
        const itemConfig = config[key];

        return (
          <div key={index} className="flex items-center gap-1.5 py-0.5">
            <span
              className="size-2 shrink-0 rounded-[2px]"
              style={{ backgroundColor: item.payload?.fill ?? item.color }}
            />

            {!hideLabel && (
              <span className="text-muted-foreground">
                {itemConfig?.label ?? item.name}
              </span>
            )}

            <span className="ml-auto font-medium text-foreground">
              {item.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, useChart };
