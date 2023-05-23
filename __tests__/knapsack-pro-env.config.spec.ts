/* eslint-disable no-undef */
import { KnapsackProEnvConfig } from '../src/config/knapsack-pro-env.config';

describe('KnapsackProEnvConfig', () => {
  // Since we use CircleCI for testing, we prevent it from interfering with the tests.
  delete process.env.CIRCLE_BUILD_NUM;

  const ENV = { ...process.env };

  afterEach(() => {
    process.env = ENV;
  });

  describe('.ciNodeBuildId', () => {
    describe('when KNAPSACK_PRO_CI_NODE_BUILD_ID is not defined on the environment', () => {
      it('throws', () => {
        expect(() => KnapsackProEnvConfig.ciNodeBuildId).toThrow(
          /Missing environment variable KNAPSACK_PRO_CI_NODE_BUILD_ID/,
        );
      });
    });

    describe('when the build id is defined on a supported CI environment', () => {
      it('returns the CI build ID for the supported CI provider', () => {
        const ciBuildId = 'some-build-id';
        process.env.GITHUB_RUN_ID = ciBuildId;

        expect(KnapsackProEnvConfig.ciNodeBuildId).toEqual(ciBuildId);
      });
    });

    describe('when KNAPSACK_PRO_CI_NODE_BUILD_ID is defined on the environment AND the build id is defined on a supported CI environment', () => {
      it('returns the CI build ID defined on the environment', () => {
        const ciBuildId = 'some-build-id';
        process.env.KNAPSACK_PRO_CI_NODE_BUILD_ID = ciBuildId;
        process.env.GITHUB_RUN_ID = 'some-other-build-id';

        expect(KnapsackProEnvConfig.ciNodeBuildId).toEqual(ciBuildId);
      });
    });
  });

  describe('.ciNodeRetryCount', () => {
    it('returns a default retry count', () => {
      expect(KnapsackProEnvConfig.ciNodeRetryCount).toEqual(0);
    });

    describe('when the CI provider is Buildkite', () => {
      describe('when BUILDKITE_RETRY_COUNT is set', () => {
        it('returns the retry count', () => {
          process.env.BUILDKITE_RETRY_COUNT = '1';

          expect(KnapsackProEnvConfig.ciNodeRetryCount).toEqual(1);
        });
      });
    });

    describe('when the CI provider is GitHub Actions', () => {
      describe('when GITHUB_RUN_ATTEMPT is set', () => {
        it('returns the retry count', () => {
          process.env.GITHUB_RUN_ATTEMPT = '2';

          expect(KnapsackProEnvConfig.ciNodeRetryCount).toEqual(1);
        });
      });
    });
  });
});
